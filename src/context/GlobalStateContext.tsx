/* eslint-disable indent */
import { ReactNode, createContext, useReducer } from 'react';
import { Student, Tutor, User } from '../models/interfaces';

interface GlobalStateProviderProps {
    children: ReactNode;
}

type Action =
    | { type: 'SET_STUDENTS'; payload: Student[] }
    | { type: 'UPDATE_STUDENTS'; payload: Student }
    | { type: 'SET_USER'; payload: User | null }
    | { type: 'SET_IS_LOGGED_IN'; payload: boolean }
    | { type: 'SET_TUTOR'; payload: Tutor | null };

export interface GlobalStateProps {
    students: Student[];
    user: User | null;
    isLoggedIn: boolean;
    tutor: Tutor | null;
    dispatch: React.Dispatch<Action>;
}

const initialState: GlobalStateProps = {
    students: [],
    user: null,
    isLoggedIn: false,
    tutor: null,
    dispatch: () => {},
};

const reducer = (state: GlobalStateProps, action: Action): GlobalStateProps => {
    switch (action.type) {
        case 'SET_STUDENTS':
            return { ...state, students: action.payload };
        case 'UPDATE_STUDENTS': {
            const studentIndex = state.students.findIndex(
                (student) => student._id === action.payload._id
            );
            if (studentIndex !== -1) {
                const updatedStudents = [...state.students];
                updatedStudents[studentIndex] = action.payload;
                return { ...state, students: updatedStudents };
            }
            return state;
        }
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_IS_LOGGED_IN':
            return { ...state, isLoggedIn: action.payload };
        case 'SET_TUTOR':
            return { ...state, tutor: action.payload };
        default:
            return state;
    }
};

export const GlobalStateContext = createContext<GlobalStateProps | undefined>(undefined);

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalStateContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
