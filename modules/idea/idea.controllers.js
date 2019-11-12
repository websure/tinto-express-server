import UUID  from 'uuid/v4'
import Ideas from '../../Mock.json'

var IdeasList = Ideas.data

export function getIdeas(req,res,next){    
    try{
        res.status(200).json({
            result:IdeasList || [],
        })
        return next()
    }catch(e){
        console.log('error in fetching Ideas  ', e)
        return res.status(500).json(e); 
    }
}

export function deleteIdeas(req,res,next){
    try{
        if(!req.params.id){
            throw 'Idea id is missing'
        }
        /* remove specific obj from ideas list */
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
        if(Object.keys(req.body.params).length < 1 ){
            throw 'idea details are missing'
        }
        let postObj = req.body.params
        let newObj = {
            id: UUID(),
            "created_date": Date.now(),
            "title": postObj.title,
            "body": postObj.body
        }
        /* adding newObj to ideasList */
        IdeasList = [newObj, ...IdeasList]
        res.status(200).json({
            ...newObj,
        })
        return next()
    } catch(error){
        console.log('error in adding ideas ', error)
        return res.status(500).json(error); 
    }
}

export function updateIdeas(req,res,next){
    try{
        if(Object.keys(req.body.params).length < 1 ){
            throw 'idea details are missing'
        }
        
        let currIdeaList = IdeasList
        let respObj={}
        /* updating the specific idea object */
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