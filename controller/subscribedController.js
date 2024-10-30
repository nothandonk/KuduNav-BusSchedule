// //import userModel from "../../models/userModel.js";
// //import routeModel from "../models/routeModel.js";
// import subscribeModel from "../models/subscribedModel.js";

// // Import the models
// //const SubscribeModel = require('../../models/subscribedModel.js');
// //const UserModel = require('../models/userModel.js');  // Assuming this exists

// // Create a function to add a subscription better option
// const subscribeUserToRoute = async (req, res) => {
//   const { userID, RouteID } = req.body;

//     // Check if both fields are provided
//     if (!userID || !RouteID) {
//         return res.status(400).json({ message: 'UserID and RouteID are required' });
//     }

//     try {
//         // Create a new subscription
//         const newSubscription = new subscribeModel({
//             userID,
//             RouteID,
//         });

//         // Save the subscription to the database
//         await newSubscription.save();

//         // Respond with success
//         res.status(201).json({ message: 'Subscription added successfully', subscription: newSubscription });
//     } catch (error) {
//         // Handle any errors
//         res.status(500).json({ message: 'Error adding subscription', error: error.message });
//     }
// }
// //remove subscription

// //list all subscribers
// const listsubs = async (req,res)=>{
//   try {
//       const subs = await SubscribeModel.find({}, 'RouteID userID -_id');
//       res.json(subs)
//   } catch (error) {
//       console.log(error)
//       res.json({success:false, message:"Error"})
//   }
// }
// // Export the controller function
// export {listsubs,subscribeUserToRoute};


//subcriptions (userId only) where route id is 0
// []
//get schedule for the route, departure time

// {"Bus Alert", "Bus leave WEC in 10 minutes", [], departure time - 10}
import subscribeModel from "../models/subscribedModel.js";


 // Create a function to add a subscription better option
 const subscribeUserToRoute = async (req, res) => {
    const { userID, RouteID } = req.params;

    // Check if both fields are provided
    if (!userID || !RouteID) {
        return res.status(400).json({ message: 'UserID and RouteID are required' });
    }

    try {
        // Find existing subscription - use findOne instead of find
        const subscription = await subscribeModel.findOne({ RouteID });

        if (!subscription) {
            // Create a new subscription
            const newSubscription = new subscribeModel({
                userIDS: [userID],
                RouteID,
            });

            const savedSubscription = await newSubscription.save();
            return res.status(200).json(savedSubscription);
        }

        // Check if user is already subscribed
        if (subscription.userIDS.includes(userID)) {
            return res.status(400).json({ message: 'User already subscribed to this route' });
        }

        // Update subscription with new user
        const updatedSubscription = await subscribeModel.findOneAndUpdate(
            { RouteID },
            { $push: { userID: userID } },
            { new: true }
        );
        
        return res.status(200).json(updatedSubscription);

    } catch (error) {
        console.error('Subscription error:', error);
        return res.status(500).json({ message: 'Error adding subscription', error: error.message });
    }
};

// Remove Subscription
const removeSubscription = async (req, res) => {
  const { userID, RouteID } = req.body;

  if (!userID || !RouteID) {
    return res.status(400).json({ message: 'userID and routeID are required' });
  }

  try {
    const deletedSubscription = await subscribeModel.findOneAndDelete({ userID, RouteID });
    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json({ message: 'Subscription removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing subscription', error: error.message });
  }
};

// List Subscriptions
const listsubs = async (req, res) => {
  try {
    const subs = await subscribeModel.find();
    res.json(subs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching subscriptions' });
  }
};

export { listsubs, subscribeUserToRoute, removeSubscription };
