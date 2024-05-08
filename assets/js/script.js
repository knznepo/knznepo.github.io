var app = new Vue({
  el: '#works',
  data: {
    works: null
  },

  mounted() {
    fetch('assets/js/data.min.json')
      .then(r => r.json())
      .then(json => {
        this.works = json;
      })
  }
})

document.querySelectorAll('.js-date')[0].innerHTML= new Date().getFullYear();
