export default function (context) {
    if (context.app.context.app.$cookies.get('token'))
        return context.redirect('/tasks')
}   