function confirmDelete() {
    if (confirm("Вы подтверждаете удаление?")) {

      $.ajax({
        type: 'POST',
        url: event.target.value,
        success: function () {
          location.reload();
        },
        error: function () {
          location.reload();
        }
      });

      return true;
    } else {
      return false;
    }
  }