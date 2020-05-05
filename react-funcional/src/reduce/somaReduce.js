import { useReducer } from 'react';

const STATE_INICIAL = {
    resultado : ''
}

const somaReduce = (state = STATE_INICIAL, action) => {
    console.log ('Action executada', JSON.stringify(action))
    switch (action.type) {
        case  'SUBTRAIR' :
        case  'SOMA' :
            return {...state, resultado : action.payload}
        default : 
          return state;
        
    }

}

const useStore = () => useReducer(somaReduce, STATE_INICIAL);

export default useStore;