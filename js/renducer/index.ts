import {combineReducers} from 'redux'
import theme from './theme/index'
import popular from './popular/index'
import trending from './trending/index'
import favorite from './favorite'
import user from './user'
import keysAndLang from './keysAndLang'
import search from './search'
/**
 * 合并reducer
 */
const index = combineReducers({
  theme: theme,
  popular: popular,
  trending: trending,
  favorite: favorite,
  user: user,
  keysAndLang,
  search
});

export default index;
