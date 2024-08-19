new Vue({
    el: '#app', // Seleziona l'elemento HTML con id 'app' come radice dell'app Vue
    data: {
        todos: [], // Array per memorizzare la lista dei task
        newTodo: { text: '', description: '' }, // Oggetto per il nuovo task, con testo e descrizione
        selectedTodo: null // Task selezionato per visualizzare i dettagli
    },
    methods: {
        // Funzione per recuperare la lista dei task dal server
        fetchTodos() {
            axios.get('api.php') // Richiesta GET all'API per ottenere i task
                .then(response => {
                    this.todos = response.data; // Aggiorna l'array todos con i dati ricevuti
                })
                .catch(error => {
                    console.error('Error fetching todos:', error); // Gestione errori in caso di fallimento della richiesta
                });
        },
        // Funzione per aggiungere un nuovo task
        addTodo() {
            if (this.newTodo.text.trim() !== '') { // Verifica che il testo del task non sia vuoto
                const newTask = {
                    text: this.newTodo.text, // Testo del nuovo task
                    completed: false, // Stato iniziale del task (non completato)
                    description: this.newTodo.description // Descrizione del nuovo task
                };
                axios.post('api.php', newTask) // Richiesta POST all'API per aggiungere il nuovo task
                    .then(response => {
                        this.todos = response.data; // Aggiorna l'array todos con la risposta del server
                        this.newTodo = { text: '', description: '' }; // Resetta il campo di inserimento
                    })
                    .catch(error => {
                        console.error('Error adding todo:', error); // Gestione errori in caso di fallimento della richiesta
                    });
            }
        },
        // Funzione per alternare lo stato di completamento di un task
        toggleComplete(index) {
            this.todos[index].completed = !this.todos[index].completed; // Cambia lo stato di completamento del task
            axios.post('api.php', { todos: this.todos }) // Richiesta POST per aggiornare lo stato dei task
                .then(response => {
                    this.todos = response.data; // Aggiorna l'array todos con la risposta del server
                })
                .catch(error => {
                    console.error('Error updating todo:', error); // Gestione errori in caso di fallimento della richiesta
                });
        },
        // Funzione per eliminare un task
        deleteTodo(index) {
            if (confirm('Sei sicuro di voler eliminare questo task?')) { // Conferma la cancellazione
                this.todos.splice(index, 1); // Rimuove il task dall'array todos
                axios.post('api.php', { todos: this.todos }) // Richiesta POST per aggiornare la lista dei task
                    .then(response => {
                        this.todos = response.data; // Aggiorna l'array todos con la risposta del server
                    })
                    .catch(error => {
                        console.error('Error deleting todo:', error); // Gestione errori in caso di fallimento della richiesta
                    });
            }
        },
        // Funzione per visualizzare i dettagli di un task
        viewDetail(todo) {
            this.selectedTodo = todo; // Imposta il task selezionato per visualizzare i dettagli
        }
    },
    mounted() {
        this.fetchTodos(); // Recupera la lista dei task dal server quando l'app viene montata
    }
});