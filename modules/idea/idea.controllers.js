import UUID  from 'uuid/v4'
import Ideas from '../../Mock.json'

var IdeasList = Ideas.data

export function getIdeas(req,res,next){
    console.log('getIdeas called')
    try{
        res.status(200).json({
            result:IdeasList,
        })
        return next()
    }catch(e){
        console.log('error in fetching Ideas  ', e)
        return res.status(500).json(e); 
    }
}

export function deleteIdeas(req,res,next){
    console.log('deleteIdeas called')
    try{
        if(!req.params.id){
            throw 'Idea id is missing'
        }
        let updatedList = IdeasList.filter( val => val.id !== req.params.id)
        IdeasList = updatedList
        res.status(200).json({
            id:req.params.id,
        })
        return next()
    }catch(e){
        console.log('error in deleting Ideas  ', e)
        return res.status(500).json(e); 
    } 
}

export function addIdeas(req,res,next){
    try{
        if(Object.keys(req.body).length < 1 ){
            throw 'idea details are missing'
        }
        let postObj = req.body.params
        let newObj = {
            id: UUID(),
            "created_date": Date.now(),
            "title": postObj.title,
            "body": postObj.body
        }
        console.log('before adding ', IdeasList)
        IdeasList = [newObj, ...IdeasList]
        console.log('after adding ', IdeasList)
        res.status(200).json({
            ...newObj,
        })
        return next()
    } catch(error){
        console.log('error in adding ideas to ', error)
        return res.status(500).json(error); 
    }
}

export function updateIdeas(req,res,next){
    try{
        if(Object.keys(req.body).length < 1 ){
            throw 'idea details are missing'
        }
        console.log('calling updateIdeas  ', req.body)
        let currIdeaList = IdeasList
        let respObj={}
        currIdeaList.forEach( (val,i) =>{
            if(val.id === req.body.params.id){
                let x =  req.body.params
                x.updated_at = Date.now()
                IdeasList[i] = Object.assign(val,x)
                respObj = Object.assign(val,x)
            }
        })

        res.status(200).json({
            ...respObj,
        })
        return next()

    } catch (err){
        console.log('unable to update idea ', err)
        return res.status(500).json(err); 
    }

}