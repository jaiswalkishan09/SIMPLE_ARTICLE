
from rest_framework import permissions
from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Allows access only to admin users.
    SAFE_METHODS: head, option and get
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff
    
class IsStaffUser(BasePermission):
    message="You Need to be Staff Users To Grant Permission is_staff)"
    def has_permission(self,request,view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.method in ["POST"]:
            # print(request.body.decode("utf-8"))
            import json
            request_dict = json.loads(request.body.decode("utf-8"))
            # print(type(request_dict))
            print(request_dict)
            try:
                if bool(request_dict["is_staff"]):
                    return False
            except KeyError:
                return True
            return True
        return False
    def has_object_permission(self, request, view,obj):
        return False


# class IsStaffUserx(BasePermission):
#     message="You Need to be Staff Users"
#     def has_permission(self,request,view):
#         if request.method in ["POST"]:
#             return True
#         return request.user and request.user.is_staff
#     def has_object_permission(self, request, view,obj):
#         if request.method in ["POST","PUT","DELETE"]:
#             return True
#         return request.user and request.user.is_staff

class IsStaffUserx(BasePermission):
    message="You Need to be Staff Users"
    def has_permission(self,request,view):
        return request.user and request.user.is_staff
    def has_object_permission(self, request, view,obj):
        return request.user and request.user.is_staff