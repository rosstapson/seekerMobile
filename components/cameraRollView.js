
var React = require('react');

var ReactNative = require('react-native');
var {
   
  ActivityIndicator,
  Alert,
  CameraRoll,
  Image,
  ListView,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  Text
} = ReactNative;

var groupByEveryN = require('groupByEveryN');
var logError = require('logError');


var CameraRollView = React.createClass({
  

  getDefaultProps() {
    return {
      groupTypes: 'SavedPhotos',
      batchSize: 5,
      imagesPerRow: 1,
      assetType: 'Photos',
      renderImage: function(asset) {
        var imageSize = 150;
        var imageStyle = [styles.image, {width: imageSize, height: imageSize}];
        return (
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
        );
      },
    };
  },

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged});

    return {
      assets: ([]),
      groupTypes: this.props.groupTypes,
      lastCursor: '',
      assetType: this.props.assetType,
      noMore: false,
      loadingMore: false,
      dataSource: ds,
    };
  },

  /**
   * This should be called when the image renderer is changed to tell the
   * component to re-render its assets.
   */
  rendererChanged() {
    var ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged});
    this.state.dataSource = ds.cloneWithRows(
      // $FlowFixMe(>=0.41.0)
      groupByEveryN(this.state.assets, this.props.imagesPerRow)
    );
  },

  componentDidMount: function() {
    this.fetch();
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.groupTypes !== nextProps.groupTypes) {
      this.fetch(true);
    }
  },

  _fetch: async function(clear) {
    if (clear) {
      this.setState(this.getInitialState(), this.fetch);
      return;
    }

    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'UIExplorer would like to access your pictures.',
        },
      );
      if (result !== 'granted') {
        Alert.alert('Access to pictures was denied.');
        return;
      }
    }

    const fetchParams = {
      first: this.props.batchSize,
      groupTypes: this.props.groupTypes,
      assetType: this.props.assetType,
    };
    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes;
    }
    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }

    try {
      const data = await CameraRoll.getPhotos(fetchParams);
      this._appendAssets(data);
    } catch (e) {
      logError(e);
    }
  },

  /**
   * Fetches more images from the camera roll. If clear is set to true, it will
   * set the component to its initial state and re-fetch the images.
   */
  fetch(clear) {
    if (!this.state.loadingMore) {
      this.setState({loadingMore: true}, () => { this._fetch(clear); });
    }
  },

  render() {
    
    return (
      <ListView
        renderRow={this._renderRow}
        renderFooter={this._renderFooterSpinner}
        onEndReached={this._onEndReached}
        
        dataSource={this.state.dataSource}
        enableEmptySections
      />
    );
  },

  _rowHasChanged: function(r1, r2) {
    if (r1.length !== r2.length) {
      return true;
    }

    for (var i = 0; i < r1.length; i++) {
      if (r1[i] !== r2[i]) {
        return true;
      }
    }

    return false;
  },

  _renderFooterSpinner: function() {
    if (!this.state.noMore) {
      
      return <ActivityIndicator />;
    }
    return null;
  },

  // rowData is an array of images
  _renderRow: function(rowData, sectionID, rowID)  {
    var images = rowData.map((image) => {
      if (image === null) {
        return null;
      }
      
      return this.props.renderImage(image);
    });

    return (
      <View style={styles.row}>
     
        {images}
      </View>
    );
  },

  _appendAssets: function(data) {
    var assets = data.edges;
    var newState = { loadingMore: false };

    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }

    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.assets = this.state.assets.concat(assets);
      newState.dataSource = this.state.dataSource.cloneWithRows(
        
        groupByEveryN(newState.assets, this.props.imagesPerRow)
      );
    }

    this.setState(newState);
  },

  _onEndReached: function() {
    if (!this.state.noMore) {
      this.fetch();
    }
  },
});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  url: {
    fontSize: 9,
    marginBottom: 14,
  },
  image: {
    margin: 4,
  },
  info: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

module.exports = CameraRollView;
