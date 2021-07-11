export const increment = (nr) => {
    return {
        type: 'INCREMENT',
        payload: nr
    };
};

export const decrement = () => {
    return {
        type: 'DECREMENT'
    };
};

export function bugAdded(description) {
    return {
        type: "bugAdded",
        payload: {
          description: description
        }
    }
};

export function bugResolved(id) {
    return {
        type: "bugResolved",
        payload: {
          id: id
        }
    }
};