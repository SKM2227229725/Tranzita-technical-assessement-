from django.db import models


class Task(models.Model):

    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        
        ('In Progress', 'In Progress'),
        
        ('Completed', 'Completed'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    dueDate = models.DateField()




    def __str__(self):
        return self.title