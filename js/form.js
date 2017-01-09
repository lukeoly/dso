$(document).ready(function(){
  // Initialise the Conditionize.
  $('.conditional').conditionize();

  // Self desucting add button after click.
  $('.btn-self-destruct').on('click', function() {
    $(this).remove();
  });


  // Auto populate additional children.
 $("#child_2_family_details").on('change', function() {
  if ($(this).prop('checked')) {
   
    // Get the values of the filled fields.
    $child1FamilyName = $('#child_1_family_name').val();
    $child1Father = $('#child_1_father').val();
    $child1Mother = $('#child_1_mother').val();
    $child1SupportedBy = $('#child_1_supported_by').val();
    $child1CurrentArrangementChanges = $('#child_1_current_arrangement_changes').val();
    $child1CurrentArrangementChangesDetails = $('#child_1_current_arrangement_changes_details').val();

    // Populate second child's details with data from first child
    $.fn.copyChildDetails = function(child1Val) {
      $(this).val(child1Val);
      var $hasValue = this.val();
      if ($hasValue) {
        $(this).parent().addClass('has-success has-feedback');
      }
    };

    $('#child_2_family_name').copyChildDetails($child1FamilyName);
    $('#child_2_father').copyChildDetails($child1Father);
    $('#child_2_mother').copyChildDetails($child1Mother);
    $('#child_2_supported_by').copyChildDetails($child1SupportedBy);
    $('#child_2_current_arrangement_changes').copyChildDetails($child1CurrentArrangementChanges);
    $('#child_2_current_arrangement_changes_details').copyChildDetails($child1CurrentArrangementChangesDetails);        
  } else {
    $('#child_2_family_name').val('');
    $('#child_2_father').val('');
    $('#child_2_mother').val('');
    $('#child_2_supported_by').val('');
    $('#child_2_current_arrangement_changes').val('');
    $('#child_2_current_arrangement_changes_details').val('');
  }
 });
});
