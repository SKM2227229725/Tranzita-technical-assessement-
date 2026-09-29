from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'priority', 'status', 'dueDate']
        

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title is required")
        return value
    
    
    
    def validate_description(self, value):
        if not value.strip():
            raise serializers.ValidationError("Description is required")
        return value
     
     
    

    def validate_dueDate(self, value):
        if not value:
            raise serializers.ValidationError("Due date is required")
        return  value 