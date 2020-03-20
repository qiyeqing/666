<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>
*{ margin: 0; padding: 0}
.app{ position: absolute;width: 100%;height:100%;min-height: 600px;overflow: hidden;} 
 ul li{ list-style: none}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.topid {width: 500px!important}
.graycontent{ background: #199de8;color: #fff;}
.margint20{margin-top:20px}
</style>
