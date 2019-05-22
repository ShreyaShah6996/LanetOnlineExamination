const INITIAL_STATE = {
    technology: [],
    subtechnology:[],
    edittechnology:'',
    deletedtechnology:'',
    error:''
}

export const GET_TECHNOLOGY = 'GET_TECHNOLOGY';
export const INVALID_DATA = 'INVALID_DATA';
export const GET_SUBTECHNOLOGY="GET_SUBTECHNOLOGY";
export const ADD_TECHNOLOGY="ADD_TECHNOLOGY";
export const EDIT_TECHNOLOGY="EDIT_TECHNOLOGY"
export const DELETE_TECHNOLOGY="DELETE_TECHNOLOGY"
export const DELETE_SUBTECHNOLOGY="DELETE_SUBTECHNOLOGY"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TECHNOLOGY: {
            return Object.assign({}, state, { technology: action.data });
        }
        case GET_SUBTECHNOLOGY: {
            return Object.assign({}, state, { subtechnology: action.data });
        }
        case ADD_TECHNOLOGY:{
            // debugger
            let tech=state.technology
            // let subtech=state.subtechnology
            let d=action.data
            tech.push(d)
            // subtech.push(d.subTechnologies)
            return Object.assign({}, state, { technology:[...tech]  });
        }
        case EDIT_TECHNOLOGY:{
            console.log("after edit response",action.data)
            const res=action.data
            const techid =res.technology.techId
            let tech=state.technology
            let index
            tech.map((t)=>{
                if(t.techId===techid){
                     index=tech.indexOf(t)
                }
                return null;
            })
            tech[index]={
                techId: res.technology.techId,
                techName:res.technology.techName,
                level: res.technology.level,
                isActive: res.technology.isActive,
                SubTechnologies:[...res.SubTechnologies]
            }
            // subtech.push(d.subTechnologies)
            return Object.assign({}, state, { technology:[...tech]  });
        }
        case DELETE_TECHNOLOGY:{
            debugger;
            const id=action.data.techId
            let index=-1;
            let t=state.technology
            for(let i=0;i<t.length;i++){
                if(t.techId===id){
                    index=i;
                    break;
                }
            }
            t.splice(index,1);
            console.log("action.data",action.data);
            return Object.assign({}, state, { technology:[...t] });
        }
        case DELETE_SUBTECHNOLOGY:{
            console.log("deleted sub tech",action.data)
            return state
        }
        case INVALID_DATA: {
            return Object.assign({}, state, { error: action.error });
        }
        default:
            return state;
    }
}
