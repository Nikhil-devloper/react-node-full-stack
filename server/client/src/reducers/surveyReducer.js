import { FETCH_SURVEYS } from '../actions/types';

console.log('geting execured');

export default function (state = [], action) {
    switch(action.type) {

        case FETCH_SURVEYS:
            
            console.log('acion',action);
            return action.payload;
        default: 
            return state;
    }
}
