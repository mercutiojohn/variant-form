import UserConfig from "./UserConfig.vue";

//增加下面代码，在按需加载时，可以使用Vue.use(HelloWorld)注册组件，也可以直接使用Vue.
UserConfig.install = function(Vue) {
  Vue.component(UserConfig.name, UserConfig);
};
export default UserConfig;
