var app = new Vue({
  el: '#works',
  data: {
    works: null
  },

  mounted() {
    fetch('assets/js/data.json')
      .then(r => r.json())
      .then(json => {
        this.works = json;
        console.log(json);
      })
  }
})

document.querySelectorAll('.js-date')[0].innerHTML= new Date().getFullYear();
