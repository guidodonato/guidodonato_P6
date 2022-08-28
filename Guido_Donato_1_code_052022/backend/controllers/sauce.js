const Sauce = require('../models/Sauce');
const fs = require('fs');

//handler pour ajouter une nouvelle sauce à la BDD//
exports.createSauce = (req, res, next) => {
    const sauceObj  = JSON.parse(req.body.sauce);
    delete sauceObj._id
    const sauce = new Sauce ({
        ...sauceObj,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
});
sauce.save()
.then(() => res.status(200).json({message: 'Objet enregistré !'}))
.catch(error => res.status(400).json({ error }));
};
//handler pour modifier une sauce //
exports.modifySauce = (req, res, next) =>{
        const sauceObj = req.file?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body}
        Sauce.findOne({_id: req.params.id})
        .then (function(sauce){
          if(sauceObj.imageUrl){
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err)=>{if(err){throw err}})};
          console.log(sauce.imageUrl, sauceObj.imageUrl)} )
          .catch( error => res.status(400).json({error}));
        Sauce.updateOne({_id: req.params.id}, { ...sauceObj, _id: req.params.id })       
        .then(() => res.status(200).json({ message: 'objet modifie'}))
        .catch( error => res.status(400).json({error}));
};
//handler pour demander une sauce //
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
   };
  //handler pour afficher toutes les sauces//
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
   };
  //handler pour supprimer une sauce et l'image du fichier image //
 exports.deleteSauce = (req, res, next) =>{
    Sauce.findOne({_id: req.params.id})
    .then( sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({ message: 'objet supprime'}))
    .catch( error => res.status(400).json({error}));
      })
    })
    .catch(error => res.status(500).json({error}));
   
  };
  //handler de les like
exports.likeSauce =(req, res, next) => {
  Sauce.findOne({_id: req.params.id})  
  .then(() => res.status(200).json())
  .catch(error => res.status(500).json({error}));

   if(req.body.like > 0){
    Sauce.findOneAndUpdate({_id: req.params.id},
      {
        $inc:{likes: 1},
        $push:{usersLiked: req.body.userId}
      },{new: true})
      .then(() => res.status(201).json())
      .catch(error => res.status(500).json({error}));
    }
    if(req.body.like < 0){
      Sauce.findOneAndUpdate({_id: req.params.id},
        {
          $inc:{ dislikes: 1},
          $push:{usersDisliked: req.body.userId},
          
        },{new: true})
        .then(() => res.status(201).json())
        .catch(error => res.status(500).json({error}));
      }
      if(req.body.like === 0){
        Sauce.findOne({_id: req.params.id})            
          .then(sauce => {
            if(sauce.usersDisliked.includes(req.body.userId)){
              Sauce.updateOne({_id: req.params.id}, {  $inc:{ dislikes: -1},
                $pull:{usersDisliked: req.body.userId}})
                .then(() => res.status(200).json())
                .catch(error => res.status(500).json({error}));
            }if(sauce.usersLiked.includes(req.body.userId)){
              Sauce.updateOne({_id: req.params.id}, {  $inc:{ likes: -1},
                $pull:{usersLiked: req.body.userId}})
                .then(() => res.status(200).json())
                .catch(error => res.status(500).json({error}));
            }
          })
          .catch(error => res.status(500).json({error}));
        }

    console.log(req.body);
   
   
  
   
  
};