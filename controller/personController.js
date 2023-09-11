const { person } = require("../model/person")

exports.getPerson = async (req, res, next) => {
    const people = [] 
    let user

    if (!(req.params.name))
        return next(res.json({ Message: "You can't retrieve a person's details without the name" }));

    const persons = await person.find({ Name: req.params.name }).catch(err => console.error(err));
    if (persons){
        if (persons.length == 0)
            return next(res.json({ Message: "There are no records of user with name " + req.params.name }));
        
        persons.map(person => {
            user = { Name: person.Name }
            people.push(user)
        })

        return next(res.json(people));
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
        res.status(201).json({ Message: "New person created successfully"})
    else
        return next(res.status(400).json({ Message: "Error creating person"}));
}

exports.updatePerson = async (req , res, next) => {
    if (!(req.params.name))
        return next(res.json({ Message: "You can't update a person's details without the name" }));

    if (!(req.body.newName))
        return next(res.json({ Message: "No new data passed to be updated" }));
    
    const user = await person.findOneAndUpdate(
        { Name: req.params.name }, 
        { $set: { Name: req.body.newName } },
        { returnDocument : "after" }
         ).catch(err => console.error(err));

    if (user)
        res.status(200).json({ Name: user.Name });
    else 
        res.json({ Message: "Updating person failed" });
}

exports.deletePerson = async (req, res, next) => {
    if (!(req.body.name))
        return next(res.json({ Message: "You can't delete a person's details without the name" }));

    const user = await person.findOneAndDelete({ Name: req.body.name }).catch(err => console.error(err));
    if (user)
        return next(res.json({ Message: "Person deleted successfully" }));
    else
        return next(res.status(400).json({ Message: "Error deleting person" }));
}
