import axios from 'axios';
import Swal from 'sweetalert2';

function deleteComment (e) {
    e.preventDefault();
    
    Swal.fire({
        title: "Delete comment?",
        text: "A deleted comment cannot be recovered",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
            //Grab the comment's id
            const commentId = this.children[0].value;

            //Create the object
            const data = {
                commentId
            }

            //Execute axios and pass the data
            axios.post(this.action, data)
                .then(res => {
                    Swal.fire({
                        title: "Deleted",
                        text: res.data,
                        icon: "success"
                      });

                    //Delete from the DOM
                    this.parentElement.parentElement.remove();
                }).catch(err => {
                    if(err.response.status === 403 || err.response.status === 404){
                        Swal.fire({
                            title: "Error",
                            text: err.response.data,
                            icon: "error"
                          });
                    }
                })
          
        }
      });


}

document.addEventListener('DOMContentLoaded', () => {
    const deleteForms = document.querySelectorAll('.delete-comment');

    //Check that the forms exist
    if(deleteForms.length > 0){
        deleteForms.forEach(form => {
            form.addEventListener('submit', deleteComment)
        })
    }
});

