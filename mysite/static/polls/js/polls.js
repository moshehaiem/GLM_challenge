$(document).ready(function(){
  getZones() 
  
});


function getZones(){
  $.ajax({
    method: "GET",
    url: "http://jump.javin.io:5000/api/zones",
  })
    .done(function( msg ) {
      displayZones(msg)
    });

}


function displayZones(response){
  $("<select>", {id: "select_dropdown_zones", style:"width:300px;margin-right:50px; height:50px"}).appendTo($('#filters'))

  $('#select_dropdown_zones').append('<option selected disabled>select zone</option>');

  for(var i=0; i< response['data'].length;i++){

    $('#select_dropdown_zones').append('<option id="'+(i+1)+'">zone id ('+response['data'][i][i+1].zone_id+'): '+response['data'][i][i+1].name+'</option>');

  }

  displayDates()
}


$(document).on('change', '#select_dropdown_zones', function(){

  $("#results").empty()
  $("<legend>", {text: "Results"}).appendTo($('#results'))

  var firstDate = new Date($('#date_first').val()).getTime()
  var secondDate = new Date($('#date_last').val()).getTime()


  if(isNaN(firstDate)){
    firstDate = new Date('0000-01-01').getTime()
  }

  if(isNaN(secondDate)){
    secondDate = new Date('9999-12-31').getTime()
  }


  var zone_id = $('#select_dropdown_zones option:selected').attr('id')
  $.ajax({
    method: "GET",
    url: "http://jump.javin.io:5000/api/awards",
  })
    .done(function( msg ) {
      for(var i=0; i< msg['data'].length;i++){
        if(msg['data'][i][i+1].zone_id == zone_id && ((new Date(msg['data'][i][i+1].entry).getTime() >= firstDate) && (new Date(msg['data'][i][i+1].entry).getTime() <= secondDate))){
          displayAwards(msg['data'][i][i+1])
        }
      }
    });
})


function displayAwards(response){
  
  $("<fieldset>", {id: "awards_display_"+response.application_id, style:"display:flex"}).appendTo($('#results'))

  $("<div>", {id: "awards_display_inner_"+response.application_id}).appendTo($("#awards_display_"+response.application_id))

  $("<h5>", {text: "Application ID: "+response.application_id}).appendTo($("#awards_display_inner_"+response.application_id))

  $("<a>", {text: "Award ID: "+response.award_id, href:"#", onclick:"showApps("+response.zone_id+", '"+response.entry+"');"}).appendTo($("#awards_display_inner_"+response.application_id))



  $("<h5>", {text: "Date: "+response.entry}).appendTo($("#awards_display_inner_"+response.application_id))

  $("<h5>", {text: "PREF: "+response.pref}).appendTo($("#awards_display_inner_"+response.application_id))

  $("<h5>", {text: "Size: "+response.size}).appendTo($("#awards_display_inner_"+response.application_id))

  $("<h5>", {text: "Zone ID: "+response.zone_id}).appendTo($("#awards_display_inner_"+response.application_id))

}

function displayDates(){
  $("<fieldset>", {id: "wrapper_for_dates", style:"display:flex"}).appendTo($('#filters'))

  $("<legend>", {text:"Dates"}).appendTo($('#wrapper_for_dates'))  

  $("<input>", {id: "date_first", placeholder:"first",style:"width:140px;margin-right:5px;"}).appendTo($('#wrapper_for_dates'))
  $("<p>", {text:" - ",style:"margin-right:20px"}).appendTo($('#wrapper_for_dates'))
  $("<input>", {id: "date_last", placeholder:"last",style:"width:140px;margin-right:5px;"}).appendTo($('#wrapper_for_dates'))


  $("<button>", {id: "clear_filters", text:"clear filters"}).appendTo($('#filters'))

}

$(document).on('click', '#clear_filters', function(){
  $("#results").empty()
  $("<legend>", {text: "Results"}).appendTo($('#results'))

  $('#date_first').val('')
  $('#date_last').val('')
  document.getElementById('select_dropdown_zones').value='select zone';
})


function showApps(zone_id, date){
  // $("<fieldset>", {id: "apps_for_"+id, style:"margin-left:10px"}).appendTo($("#awards_display_"+id))

  window.location.replace('http://jump.javin.io:5000/api/applications?zone='+zone_id+'&date='+date);

}


// function getAppInfo(zone_id, date){

//   console.log(zone_id, date)
//   $.ajax({
//     method: "GET",
//     url: 'http://jump.javin.io:5000/api/applications?zone='+zone_id+'&date='+date,
//   })
//     .done(function( msg ) {
//       console.log(msg)
//     });  
// }