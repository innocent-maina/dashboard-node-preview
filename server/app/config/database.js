module.exports = (mongoose) => {
  mongoose.connect('mongodb+srv://innocent:wahome2020@timetracker.elei8.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });
};
