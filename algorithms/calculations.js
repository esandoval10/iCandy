var calculate = {

    bodyFat: function (user) {

        switch(user.gender){
            case "Male": 
                user.fatPercentage = 100 * (-98.42 + 4.15 * user.waistSize - 0.082 * user.weight) / user.weight;
            break;
            case "Female":
                user.fatPercentage = 100 * (-76.76 + 4.15 * user.waistSize - 0.082 * user.weight) / user.weight;
            break;
        }
    },

    restingMetabolicRate:function (user){

        var kiloWeight = user.weight * 0.45;
        var centHeight = user.height * 30.48;

        switch(user.gender){
            case "Male": 
            user.rmr = (9.99 * kiloWeight) + (6.25 * centHeight) - (4.92 * user.age) + 5
            break;
            case "Female":
            user.rmr = (9.99 * kiloWeight) + (6.25 * centHeight) - (4.92 * user.age) - 161
            break;
        }
    },

    totalCaloriesNeeded: function(user){
        user.caloriesPerDay = user.bmr * user.activityLevel;
    },

    caloriesLeft: function(user, caloriesEaten){
        var remainingCals = user.caloriesPerDay - caloriesEaten;

        if (remainingCals > 0){
            return remainingCals;
        }

        else{
           return remainingCals += caloriesEaten
        }
    }

};

module.exports = calculate;