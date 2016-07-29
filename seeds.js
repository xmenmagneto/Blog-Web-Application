var mongoose = require('mongoose'),
    Campground = require('./models/campgrounds'),
    Comment = require('./models/comment');

var data = [{
                name: "Cloud's Rest",
                image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
                description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
            },
            {
                name: "Desert Mesa",
                image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg",
                description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
            },
            {
                name: "Canyon Floor",
                image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
                description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
            }];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if(err){
            console.log(err)
        }
        console.log('campgrounds removed!');
        //add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground");
                    //create a commnet
                    Comment.create({
                        text: "This place is great, but I wish there was internet.",
                        author: "Homer"
                    }, function (err, comment) {
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log('created new comment');
                        }
                    })
                }
            })
        });
    });
    //add a few comments
}

module.exports = seedDB;