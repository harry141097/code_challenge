let routes = ['main'];
module.exports = (app) =>{
  routes.forEach((route)=>{
    console.log('route', route)
    require('./' + route)(app);
  })
};