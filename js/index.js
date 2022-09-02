import { Router } from "./router.js"

const router = new Router()

router.addRoutes("/home", "/pages/home.html")
router.addRoutes("/universe", "/pages/universe.html")
router.addRoutes("/explorer", "/pages/explorer.html")
router.addRoutes(404, "/pages/404.html")

if(window.location.pathname == '/') {
  window.history.pushState({}, "", '/home')
}

router.handle()

window.onpopstate = () => handle()

//aqui coloco no window.route(q está no index html (onclick route()) a 
//função route(), pq sem indicar aqui, não estava funcionando)
window.route = () => router.route()

