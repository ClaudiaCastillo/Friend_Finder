// ===============================================================================
// DATA
// Below data will hold all of the friends.
// Initially we just set it equal to a "dummy" friend.
// But you could have it be an empty array as well.
// ===============================================================================

var friendsArray = [
 
  {
    name: "Jim",
    photo: "https://s8.favim.com/orig/72/baby-cute-dengo-dog-Favim.com-713908.jpg",
    scores: ["5","1","4","4","5","1","2","5","4","1"]
  },
  {
    name: "Jane",
    photo: "https://s2.favim.com/90/140408/baby-beautiful-cute-dog-Favim.com-1627619.jpg",
    scores: ["1","2","3","3","5","2","2","5","1","1"]
  },
  {
    name: "Frank",
    photo: "https://s6.favim.com/90/60/animal-baby-cute-dog-Favim.com-539729.jpg",
    scores: ["4","4","5","5","5","4","3","5","3","3"]
  }
];

// Note how we export the array. This makes it accessible to other files using require.
module.exports = friendsArray;
