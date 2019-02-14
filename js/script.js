function Model () {
    this.articles = []
}

function View (model) {
    this.model = model
}


View.prototype.renderView = (article) => {
    if (article.urlToImage === null) { article.urlToImage = 'http://www.xlogicsoft.ru/sites/default/files/imagecache/blog-list/blog/1/news.jpg' }
    const template = document.querySelector('#template-article')
    const divArticles = document.getElementById('newsArticle')
    const a = template.content.querySelector('a')
    const h1 = template.content.querySelector('h1')
    const h2 = template.content.querySelector('h2')
    const img = template.content.querySelector('img')
    const h4 = template.content.querySelector('h4')
    const h5 = template.content.querySelector('h5')
    a.href = article.url
    h1.textContent = article.title
    h2.textContent = article.description
    img.src = article.urlToImage
    h4.textContent = article.source.name
    h5.textContent = article.publishedAt
    const clone = document.importNode(template.content, true)
    divArticles.appendChild(clone)
}

View.prototype.openPopUpWindow = (articles) => {
    document.getElementById('popup-image').style.display = 'inline-block'
    document.getElementById('wrap').style.display = 'inline-block'
    document.getElementById('popupWindow').style.display = 'inline-block'
    document.getElementById('popupWindow').insertAdjacentHTML('afterBegin', `<h3>We already have last news from '${articles[0].source.name}'<br>Would you like to see it?</h3>`)
}

View.prototype.closePopUpWindow = () => {
    document.getElementById('popupWindow').style.display = 'none'
    document.getElementById('wrap').style.display = 'none'
    document.getElementById('popup-image').style.display = 'none'
}


View.prototype.viewSomeArticles = function (news, element, style) {
  news.children[this.model.articles.indexOf(element)].style.display = style
}

function Controller (model, view) {
    this.model = model
    this.view = view
    window.addEventListener('message', this.getMessage.bind(this))
}

Controller.prototype.check = function () {
  const news = document.getElementById('newsArticle')
  const that = this
  const sport = document.getElementById('sport')
  const business  = document.getElementById('business')
  const nature = document.getElementById('nature')
  const science = document.getElementById('science')
  const ukraine = document.getElementById('ukraine')
  const sport1 = document.getElementById('sport1')
    const business1  = document.getElementById('business1')
    const nature1 = document.getElementById('nature1')
    const science1 = document.getElementById('science1')
    const ukraine1 = document.getElementById('ukraine1')
    sport1.onclick = function () {
        if (sport.checked === true) {
            sport.checked = false
            that.checkBox (news, sport, business, nature, science, ukraine)
        }
        else {
            sport.checked = true
            that.checkBox (news, sport, business, nature, science, ukraine)
        }
    }

    business1.onclick = function () {
        if (business.checked === true) {
            business.checked = false
            that.checkBox (news, sport, business, nature, science, ukraine)
        }
        else {
            business.checked = true
            that.checkBox (news, sport, business, nature, science, ukraine)
        }
    }

    nature1.onclick = function () {
        if (nature.checked === true) {
            nature.checked = false
            that.checkBox (news, sport, business, nature, science, ukraine)
        }
        else {
            nature.checked = true
            that.checkBox (news, sport, business, nature, science, ukraine)
        }
    }

    science1.onclick = function () {
        if (science.checked === true) {
            science.checked = false
            that.checkBox (news, sport, business, nature, science, ukraine)
        }
        else {
            science.checked = true
            that.checkBox (news, sport, business, nature, science, ukraine)
        }
    }

    ukraine1.onclick = function () {
        if (ukraine.checked === true) {
            ukraine.checked = false
            that.checkBox (news, sport, business, nature, science, ukraine)
        }
        else {
            ukraine.checked = true
            that.checkBox (news, sport, business, nature, science, ukraine)
        }
    }
  nature.onclick = function () {
    that.checkBox (news, sport, business, nature, science, ukraine)
  }
  sport.onclick = function () {
    that.checkBox (news, sport, business, nature, science, ukraine)
  }
  business.onclick = function () {
    that.checkBox (news, sport, business, nature, science, ukraine)
  }
  science.onclick = function () {
    that.checkBox (news, sport, business, nature, science, ukraine)
  }
  ukraine.onclick = function () {
    that.checkBox (news, sport, business, nature, science, ukraine)
  }
}

Controller.prototype.checkBox = function (news, sport, business, nature, science, ukraine) {
  for (const element of this.model.articles) {
    this.view.viewSomeArticles(news, element, 'none')
  }
  if (sport.checked === false && business.checked === false && nature.checked === false && science.checked === false && ukraine.checked === false) {
    for (const element of this.model.articles) {
      this.view.viewSomeArticles(news, element, 'block')
    }
  }
  if (sport.checked === true) {
    for (const element of this.model.articles) {
      if (element.source.name === 'BBC Sport') {
        this.view.viewSomeArticles(news, element, 'block')
      }
    }
  }
  if (business.checked === true) {
    for (const element of this.model.articles) {
      if (element.source.name === 'Business Insider') {
        this.view.viewSomeArticles(news, element, 'block')
      }
    }
  }
  if (science.checked === true) {
    for (const element of this.model.articles) {
      if (element.source.name === 'New Scientist') {
        this.view.viewSomeArticles(news, element, 'block')
      }
    }
  }
  if (nature.checked === true) {
    for (const element of this.model.articles) {
      if (element.source.name === 'National Geographic') {
        this.view.viewSomeArticles(news, element, 'block')
      }
    }
  }
  if (ukraine.checked === true) {
    for (const element of this.model.articles) {
      if (element.source.id === null) {
        this.view.viewSomeArticles(news, element, 'block')
      }
    }
  }
}

Controller.prototype.getMessage = function (e) {
    if (this.refreshPageOfArticles(e.data)) {
        this.model.articles = e.data
        this.sortArticlesByDate()
    } else {
        return this.view.openPopUpWindow(e.data) + this.pressPopUpButtons()
    }
}

Controller.prototype.sortArticlesByDate = function () {
    this.model.articles.sort(function (a, b) {
        if (a.publishedAt > b.publishedAt) { return -1 }
        if (a.publishedAt < b.publishedAt) { return 1 }
        return 0
    })
    return this.breakUpElementsOfArray() + this.check()
}

Controller.prototype.breakUpElementsOfArray = function () {
    this.model.articles.forEach(article => {
        return this.view.renderView(article)
    })
}

Controller.prototype.pressPopUpButtons = function () {
    document.getElementById('button-close-popup').addEventListener('click', () => {
        return this.view.closePopUpWindow()
    })
    document.getElementById('button-relode-page').addEventListener('click', () => {
        window.location.reload()
})
}

Controller.prototype.refreshPageOfArticles = function (dataOfArray) {
    for (const element of this.model.articles) {
        const indexOfArticles = dataOfArray.map((e) => { return e.title }).indexOf(element.title)
        if (indexOfArticles === -1) {
            return false
        }
    }
    return true
}
class Articles {
    constructor (...url) {
    this.url = url
    this.getArticles(url)
    setInterval(() => {
    this.getArticles(url)
}, 300000)
}

getArticles () {
    Promise.all(this.url.map((urlName) => {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest()
            xhr.responseType = 'json'
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response.articles)
                    } else {
                        reject(xhr.status)
                    }
                }
            }
            xhr.open('get', urlName)
            xhr.send()
        })
    })
).then((results) => {
        const articles = results.reduce((acc, items) => {
            acc.push(...items)
    return acc
}, [])
    window.postMessage(articles, '*')
})
}
}

window.onload = () => {
    const articles = new Articles('https://newsapi.org/v2/top-headlines?sources=new-scientist&apiKey=90efd75b335b4f8fbf5c8bc2bdc67da4', 'https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=90efd75b335b4f8fbf5c8bc2bdc67da4',
      'https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=90efd75b335b4f8fbf5c8bc2bdc67da4', 'https://newsapi.org/v2/top-headlines?sources=business-insider&apiKey=90efd75b335b4f8fbf5c8bc2bdc67da4',
      'https://newsapi.org/v2/top-headlines?country=ua&category=business&apiKey=90efd75b335b4f8fbf5c8bc2bdc67da4' ,'https://newsapi.org/v2/top-headlines?country=ua&category=entertainment&apiKey=90efd75b335b4f8fbf5c8bc2bdc67da4', 'https://newsapi.org/v2/top-headlines?country=ua&category=science&apiKey=90efd75b335b4f8fbf5c8bc2bdc67da4',
      'https://newsapi.org/v2/top-headlines?country=ua&category=sports&apiKey=90efd75b335b4f8fbf5c8bc2bdc67da4')
    const model = new Model()
    const view = new View(model)
    const controller = new Controller(model, view)
}



