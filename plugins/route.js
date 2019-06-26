export default ({ app, redirect, store }) => {
    app.router.beforeEach((to, from, next) => {
        const isClient = process.client;
        const paths = ['/admin', '/admin/add', '/admin/edit'];
        if (isClient){
            if (paths.includes(to.path)){
                let token = localStorage.getItem('admin_token');
                if(!token){
                    redirect('/admin/login');
                }else{
                    next();
                }
            }else{
                next();
            }
        }else{
            next();
        }
    })
}