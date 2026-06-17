from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
    
    # Optional: Prevent editing of contact messages from admin to preserve integrity, only allow viewing and deleting
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
