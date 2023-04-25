const express = require('express')
const router = express.Router()
const ballsCollection = require('./model')

router.get('/fetchData', async function fetchData(req, res) {
    try {
        // const getOneDoc = await ballsCollection.findOne();
        // return res.status(200).send({ data: getOneDoc });

        /* ===================================================================== */

        // const getAllDoc = await ballsCollection.find();
        // return res.status(200).send({ data: getAllDoc });

        /* ===================================================================== */

        // const viratDoc = await ballsCollection.findOne({batsman : "V Kohli"});
        // return res.status(200).send({ data : viratDoc });

        /* ===================================================================== */

        // const viratDocWithBalls = await ballsCollection.findOne({$and:[{batsman : "V Kohli"}, {ball:6}]});
        //OR
        // const viratDocWithBalls = await ballsCollection.findOne({batsman : "V Kohli", ball:6});
        // return res.status(200).send({ data : viratDocWithBalls });

        /* ===================================================================== */

        // find total runs of all batsman:)
        // const totalRuns = await ballsCollection.aggregate([
        //     {$group : {_id: '$batsman', totalRuns: {$sum : '$batsman_runs'}} }
        // ]).exec()
        // return res.status(200).send({ data : totalRuns })

        /* ===================================================================== */

        // find total runs of Viral Kohli:)
        // const totalRuns = await ballsCollection.aggregate([
        //     { $match: { batsman: 'V Kohli' } },
        //     { $group: { _id: '$batsman', totalRuns: { $sum: '$batsman_runs' } } }
        // ]).exec()
        // return res.status(200).send({ data: totalRuns })
        // output -> [ { _id: 'V Kohli', totalRuns: 6136 } ]

        /* ===================================================================== */

        // find total runs of Viral Kohli with specified fields name:)
        // const totalRuns = await ballsCollection.aggregate([
        //     { $match: { batsman: 'V Kohli' } },
        //     { $group: { _id: '$batsman', totalRuns: { $sum: '$batsman_runs' } } },
        //     {$project: {name:'$_id', _id:0, totalRuns: 1 }}
        // ]).exec()
        // return res.status(200).send({ data: totalRuns })
        // outpur ->  [ { totalRuns: 6136, name: 'V Kohli' } ]

        /* ===================================================================== */

        // find the player scores from highest to lowest:)
        // const runs = await ballsCollection.aggregate([
        //     {$group: {_id: "$batsman", totalRuns: {$sum : '$batsman_runs'}}},
        //     {$sort: {'totalRuns': -1}},
        //     {$project: {name: '$_id', _id:0, totalRuns: 1}}
        // ]).exec()
        // return res.status(200).send({ data: runs })

        /* ===================================================================== */

        // find the bowlwer who gives highest runs:)
        // const runs = await ballsCollection.aggregate([
        //     {$group: {_id: "$bowler", totalGivenRuns: {$sum : '$total_runs'}}},
        //     {$sort: {'totalGivenRuns': -1}},
        //     {$project: {name: '$_id', _id:0, totalGivenRuns: 1}}
        // ]).exec()
        // return res.status(200).send({ data: runs })

        /* ===================================================================== */

        // find the batsman with highest strike rate:)
        // const strike = await ballsCollection.aggregate([
        //   {$group: {_id: "$batsman", totalRuns: {$sum: '$batsman_runs'}, totalBalls: {$sum: 1} }},
        //   {$project: {name:"$_id", _id:0, strikeRate:{$multiply:[{ $divide:["$totalRuns", "$totalBalls"] } , 100]} }}  
        // ]).exec()
        // return res.status(200).send({ data: strike })

        /* ===================================================================== */

        // find the batsman with highest strike rate who plays greater atleat 100 balls:)
        // Note: By using $sum : 1 we can calculates the documnents
        // const strike = await ballsCollection.aggregate([
        //     { $group: { _id: "$batsman", totalRuns: { $sum: '$batsman_runs' }, totalBalls: { $sum: 1 } } },
        //     {$match: {totalBalls:{$gte:100}}} ,
        //     { $project: { name: "$_id", _id: 0, strikeRate: { $multiply: [{ $divide: ["$totalRuns", "$totalBalls"] } , 100] } } },
        // {$sort:{strikeRate:-1}}
        // ]).exec()
        // return res.status(200).send({ data: strike })

        /* ===================================================================== */

        // Find the most economical bowler who has delivered at least 300 balls:)
        const strike = await ballsCollection.aggregate([
            { $group: { _id: "$bowler", totalRuns: { $sum: '$total_runs' }, totalBalls: { $sum: 1 } } },
            {$match: {totalBalls:{$gte:300}}} ,
            { $project: { name: "$_id", _id: 0, totalBalls:1 , economy: {$multiply:[{ $divide: ["$totalRuns", "$totalBalls"] }, 6]} } },
            {$sort: {'economy' : 1}}
        ]).exec()
        // return res.status(200).send({ data: strike })

        /* ===================================================================== */

        // Find the batsman who has scored the most number of runs in death overs:)
        const runs = await ballsCollection.aggregate([
            {$match: {over:{$in: [16, 17, 18, 19]}} },
            {$group: {_id: "$batsman", totalRuns: {$sum: '$batsman_runs'}}},
            {$project: {name: "$_id", _id: 0, totalRuns : 1}},
            {$sort: {totalRuns: -1}}
        ]).exec()
        // return res.status(200).send({ data: runs })

        /* ===================================================================== */

        // Find the batsman who has hit the most number of boundaries against ‘Mumbai Indians’:)
        const boundaries = await ballsCollection.aggregate([
            {$match: {bowling_team : "Mumbai Indians", batsman_runs: {$gte:4}}},
            {$group: {_id: "$batsman", totalBoundaries:{$sum:1} }},
            {$project: {name: "$_id", _id:0, totalBoundaries: 1}},
            {$sort: {totalBoundaries: -1}}
        ]).exec()
        return res.status(200).send({ data: boundaries })

    } catch (err) {
        return res.status(500).send({ status: 500, msg: err.message });
    }
}) 

module.exports = router
