// app.js


new Vue ({
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
    totalScore: 0,
  },

  methods: {
    score: function(coord1, coord2) {
      this.$http.post('/api/v1/score')
        .then((result) => {
          totalScore = totalScore + parseInt(result.score);
        });
    },

    start() {
      this.$Progress.start();
      setTimeout(() => {
        this.$Progress.finish();
      }, 10000);
    }
  }
})