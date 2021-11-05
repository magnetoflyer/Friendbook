class Database {
    #users = new Map();
    #connections = new Map();

    findPaths(person1, person2) {
        const allPaths = [];
        const q = [];
        const visited = new Map();

        q.push([person1]);
        visited.set(person1, true);

        while(q.length>0) {
            const path = q.shift();
            const last = path[path.length-1];
            visited.set(last, true);

            if(last === person2) {
                allPaths.push(path.map(person => this.#users.get(person)));
                continue;
            }

            for(const child of this.#connections.get(last)) {
                if (!visited.get(child)) {
                    q.push([...path, child]);
                }
            }
        }
        return allPaths;
    }

    addPerson(person) {
        const personObj = {
            id: Date.now(),
            ...person
        }
        this.#users.set(personObj.id, personObj);
        this.#connections.set(personObj.id, []);
    }

    connectPersons(person1_id, person2_id) {
        this.#connections.set(person1_id, [...this.#connections.get(person1_id), person2_id]);
        this.#connections.set(person2_id, [...this.#connections.get(person2_id), person1_id]);
    }

    viewconnection(person1_id, person2_id) {
        return this.findPaths(person1_id, person2_id);
    }

    getAllPersons() {
        return [...this.#users.values()];
    }
}

export const db = new Database();