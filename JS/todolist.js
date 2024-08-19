new Vue({
    el: '#app', // Radice dell'app Vue
    data: {
        todos: [], // Lista dei task
        newTodo: { text: '', description: '' }, // Nuovo task con testo e descrizione
        selectedTodo: null // Task selezionato per i dettagli
    },
    methods: {
        // Recupera la lista dei task
        fetchTodos() {
            axios.get('api.php')
                .then(response => {
                    this.todos = response.data;
                })
                .catch(error => {
                    console.error('Error fetching todos:', error);
                });
        },
        // Aggiunge un nuovo task
        addTodo() {
            if (this.newTodo.text.trim() !== '') {
                const newTask = {
                    text: this.newTodo.text,
                    completed: false,
                    description: this.newTodo.description
                };
                axios.post('api.php', newTask)
                    .then(response => {
                        this.todos = response.data;
                        this.newTodo = { text: '', description: '' }; // Resetta il modulo
                    })
                    .catch(error => {
                        console.error('Error adding todo:', error);
                    });
            }
        },
        // Alterna lo stato di completamento di un task
        toggleComplete(index) {
            this.todos[index].completed = !this.todos[index].completed;
            axios.post('api.php', { todos: this.todos })
                .then(response => {
                    this.todos = response.data;
                })
                .catch(error => {
                    console.error('Error updating todo:', error);
                });
        },
        // Elimina un task
        deleteTodo(index) {
            if (confirm('Sei sicuro di voler eliminare questo task?')) {
                this.todos.splice(index, 1);
                axios.post('api.php', { todos: this.todos })
                    .then(response => {
                        this.todos = response.data;
                    })
                    .catch(error => {
                        console.error('Error deleting todo:', error);
                    });
            }
        },
        // Mostra i dettagli di un task
        viewDetail(todo) {
            this.selectedTodo = todo;
        }
    },
    mounted() {
        this.fetchTodos(); // Recupera i task al montaggio
    }
});
