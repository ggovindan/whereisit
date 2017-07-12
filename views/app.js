// app.js

Vue.http.options.emulateJSON = true;

var myVue = new Vue ({
  el: "#dipoza",

  data: {
    puzzle: {
              "city": "Fort Yukon",
              "lat": "66.56468243",
              "lng": "-145.2737789",
              "country": "United States of America",
              "code_iso2": "US",
              "code_iso3": "USA",
              "province": "Alaska"
            },
    puzzleList: [],
    totalScore: 0,
    countDownTime: 10,
    solveTime: 0,
    timer: null,
  },

  mounted: function() {
    this.newPuzzle();
    //this.countDown();
  },

  methods: {
    score: function(coord1, coord2) {
      let formData = new FormData({coord1: coord1, coord2: coord2});
      this.$http.post('/score', JSON.stringify({coord1: coord1, coord2: coord2}))
        .then((result) => {
          var temp = this.totalScore;
          temp += parseInt(result.data.score);
          this.$set(this, 'totalScore', temp);
        });
    },

    newPuzzle: function(level=0) {
      if (this.totalScore > 10000) {
        level = 1;
      }
        this.$http.get(`/game${level}`)
          .then((result) => {
            this.$set(this, 'puzzleList', result.data.cities);
            this.nextPuzzle();
            // const puzzle = this.puzzleList[Math.floor(Math.random() * 10)];
            // this.$set(this, 'puzzle', puzzle);
          });
    },

    nextPuzzle: function() {
      if (this.puzzleList.length === 0) {
        this.newPuzzle(0);
        return;
      }
      const puzzle = this.puzzleList.pop();
      this.$set(this,  'puzzle', puzzle);
      clearMarkerFromMap();
      this.countDown();
    },

    countDown: function() {
      var vm = this;
      vm.solveTime = this.countDownTime;
      console.log("SETTING TIMMER !!!");
      //if timer is already running then return
      if (this.timer != null) {
        return;
      }
      this.timer = setInterval(function() {
        if(vm.solveTime < 1 || vm.solveTime === 0) {
          vm.solveTime = 'timeout';
          // call the answer function that will put the green dot
          placeAnswerMarker({lat: parseFloat(vm.puzzle.lat), lng: parseFloat(vm.puzzle.lng)},
            `<b>${vm.puzzle.city}, ${vm.puzzle.province}, ${vm.puzzle.country}</b><br>`);
          return clearInterval(this.timer);

        } else if(vm.solveTime > 0) {
          vm.solveTime -= 1;
        }
      }, 1000);
    },

    start() {
      this.$Progress.start();
      setTimeout(() => {
        this.$Progress.finish();
      }, 10000);
    }
  }
})