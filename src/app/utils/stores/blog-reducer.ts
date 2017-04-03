import { Post } from '../../data-objects/post';
import { Action, ActionReducer, State } from '@ngrx/store';
export const actions = {LOAD: 'LOAD', ADD: 'ADD', MODIFY: 'MODIFY', DELETE: 'DELETE', UPDATE: 'UPDATE' };

export function BlogReducer(state: Post[] = [], action: Action): Post[] {
    switch (action.type) {
        case actions.LOAD:
            return action.payload;
        case actions.ADD:
            return [...state, action.payload];
        case actions.DELETE:
            return state.filter(post => {return post.id !== action.payload.id; });
        case actions.UPDATE:
            // used findIndex instead of indexOf becasue this allows me to sent specific function to get the index
            let index = state.findIndex(item => item.id === action.payload.id);
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + 1)
                ];
            }
            return state;
        default: return state;
    }
}
