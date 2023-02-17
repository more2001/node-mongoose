const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');
    

    //if we do't use .create() we will need to manually save the document using .save()
    // var newDish = Dishes({   
    //     name: 'Momos',
    //     description: 'tasty'
    // });

    // newDish.save()
    Dishes.create({
        name: 'Maggi',
        description: 'made of maidaa'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test'}
        },{ 
            new: true 
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: 'Healthy',
            author: 'Churan Gill'
        });
        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        // return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });

});