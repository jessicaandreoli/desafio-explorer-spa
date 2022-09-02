export class Router {
  routes = {}

  addRoutes(nameRoute, page) {
    this.routes[nameRoute] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    //Desabilitei o envio usual da página com o 
    //preventDefault e avisei o novo caminho
    //adicionando no histórico
    const currentPath = window.location.pathname
    const targetPath = event.target.href

    if(targetPath.includes(currentPath)) {
      console.log('oi')
      return
    }
    window.history.pushState({}, "", targetPath)
    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const routers = this.routes[pathname] || this.routes[404]
    console.log([pathname])

    fetch(routers)
      .then(data => data.text())
      .then(html => {
          document.querySelector('.app').innerHTML = html        
      })
      

      if(routers == this.routes['/home'] || this.routes[404]) {
        this.addAndRemoveThemeRoute('home', 'explorer', 'universe')
      }
      if(routers == this.routes['/universe']) {
        this.addAndRemoveThemeRoute('universe', 'home', 'explorer')
      }
      if(routers == this.routes['/explorer']) {
        this.addAndRemoveThemeRoute('explorer', 'home', 'universe')
      }
  }

  addAndRemoveThemeRoute(themeOne, themeTwo, themeTree) {
    const bodyTheme = document.querySelector('body')
    bodyTheme.classList.add(themeOne)
    bodyTheme.classList.remove(themeTwo)
    bodyTheme.classList.remove(themeTree)
  }

  

  
}