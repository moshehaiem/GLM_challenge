from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    context = {
        'status' : 0,
        'success' : True,
        'template_name' : 'polls/polls.html',
        'title' : 'Website',
    }

    return render(request, context['template_name'], context=context)