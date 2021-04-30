export default function ({app, redirect}) {
    if (!!app.$cookies.get('isAuth'))
        return redirect('/tasks')
}   