const { person } = require("../model/person")

exports.getAll = async(req, res, next) => {
    const persons = await person.find({});
    res.status(200).json(persons)
}

exports.getPerson = async (req, res, next) => {
    if (!(req.params.user_id))
        return next(res.json({ Message: "You can't retrieve a person's details without the name" }));

    const persons = await person.find({ Name: req.params.user_id }).catch(err => console.error(err));
    if (persons){
        if (persons.length == 0)
            return next(res.json({ Message: "There are no records of user with name " + req.params.name }));

        return next(res.status(200).json(persons));
    }
    else
        return next(res.json({ Message: "Error fetching person" }));
}

exports.addPerson = async (req, res, next) => {
    if (!(req.body.name))
        return next(res.json({ Message: "Make sure all input spaces are filled"}));

    const newPerson = new person({
        Name: req.body.name
    })

    const created = await newPerson.save().catch(err => console.error(err));
    if (created)
        return next(res.status(200).json(created));
    else
        return next(res.status(400).json({ Message: "Error creating person"}));
}

exports.updatePerson = async (req , res, next) => {
    if (!(req.params.user_id))
        return next(res.json({ Message: "You can't update a person's details without the name" }));

    if (!(req.body.newName))
        return next(res.json({ Message: "No new data passed to be updated" }));
    
    const user = await person.findOneAndUpdate(
        { Name: req.params.user_id }, 
        { $set: { Name: req.body.newName } },
        { returnDocument : "after" }
         ).catch(err => console.error(err));

    if (user)
        res.status(200).json(user);
    else 
        res.json({ Message: "Updating person failed" });
}

exports.deletePerson = async (req, res, next) => {
    if (!(req.params.user_id))
        return next(res.json({ Message: "You can't delete a person's details without the name" }));

    const user = await person.findOneAndDelete({ Name: req.params.user_id }).catch(err => console.error(err));
    if (user)
        return next(res.status(200).json(user));
    else
        return next(res.status(400).json({ Message: "Error deleting person" }));
}
