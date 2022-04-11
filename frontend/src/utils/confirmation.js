import Swal from 'sweetalert2'

const confirmation = (question, button, success, task) => {
    Swal.fire({
        text: question,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button,
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await task()
            Swal.fire(
                '',
                success,
                'success'
            )
        }
    })
}

export default confirmation