import { useState } from 'react';
import { FlatList, RefreshControl, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import NavigationUtil from '../../navigator/NavigationUtil'
import {FLAG_STORAGE} from '../../expand/dao/DataStore';
export default function FlatListComponents(props) {
  let flagIndex = 1
  const [canLoadMore, setCanLoadMore] = useState(false);

  const _listEmpty = (data) => {// 无数据显示状态
    return <View style={{flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center'}}>
      <Text>暂无数据</Text>
    </View>
  }
  const genIndicator = () => {// 底部加载更多
    return props.storeList.hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }
  return (
    <FlatList
      data={props.storeList.projectModels}
      // getItemLayout={(data, index) => ( // 固定高度才能这么设置，否则会有问题
      //    { length: 380, offset:380 * index, index } 
      // )}
      ListEmptyComponent={(data) => _listEmpty(data)}
      initialNumToRender={5}
      renderItem={(data) => props.renderItem(data)}
      keyExtractor={(item) => "" + item.id + ++flagIndex}
      refreshControl={
        <RefreshControl
          title={'Loading'}
          titleColor={'red'}
          colors={['red']}
          refreshing={props.storeList.isLoading}
          onRefresh={() => props.loadData(false)}
          tintColor={'red'}
        />
      }
      ListFooterComponent={() => genIndicator()}
      onEndReached={() => {
        setTimeout(() => {
          if (canLoadMore) {//fix 滚动时两次调用onEndReached
            props.loadData(true);
            // this.canLoadMore = false;
            setCanLoadMore(false);
          }
        }, 100);
      }}
      onEndReachedThreshold={0.5}
      onMomentumScrollBegin={() => {
        // this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
        setCanLoadMore(true);
      }}
    />
  )
}

const styles = StyleSheet.create({
  indicatorContainer: {
    alignItems: "center",
    
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});
