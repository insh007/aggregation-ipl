const mongoose = require("mongoose");
const ballSchema = new mongoose.Schema({
    id: Number,
    inning: Number,
    over: Number,
    ball: Number,
    batsman: String,
    non_striker: String,
    bowler: String,
    batsman_runs: Number,
    extra_runs: Number,
    total_runs: Number,
    non_boundary: Number,
    is_wicket: Number,
    dismissal_kind: String,
    player_dismissed: String,
    fielder: String,
    extras_type: String,
    batting_team: String,
    bowling_team: String,
});

module.exports = mongoose.model("balls", ballSchema);