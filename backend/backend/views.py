from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import authenticate

from .models import Job, Application
from .serializers import (
    RegisterSerializer,
    JobSerializer,
    ApplicationSerializer,
    ApplicationListSerializer
)

@api_view(['GET'])
def hello_api(request):
    return Response({
        "message": "Hello from Django API"
    })


@api_view(['POST'])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        return Response(
            {
                "message": "User Registered Successfully!",
                "user_id": user.id
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
def basic_login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user:
        return Response(
            {
                "message": "Login successful",
                "user_id": user.id,
                "username": user.username
            },
            status=status.HTTP_200_OK
        )

    return Response(
        {
            "message": "Invalid Credentials"
        },
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
def job_list(request):

    jobs = Job.objects.all().order_by('-id')

    serializer = JobSerializer(
        jobs,
        many=True
    )

    return Response(serializer.data)


@api_view(['POST'])
def apply_job(request):

    job_id = request.data.get("job")
    applicant_id = request.data.get("applicant")

    if not job_id or not applicant_id:
        return Response(
            {
                "message": "Job and Applicant are required"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if Application.objects.filter(
        job_id=job_id,
        applicant_id=applicant_id
    ).exists():

        return Response(
            {
                "message": "You already have applied!"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = ApplicationSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "message": "Application Submitted"
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
def my_applications(request, user_id):

    applications = Application.objects.filter(
        applicant_id=user_id
    ).select_related('job')

    serializer = ApplicationListSerializer(
        applications,
        many=True
    )

    return Response(serializer.data)

@api_view(['GET'])
def application_details(request, application_id):

    try:
        application = Application.objects.select_related(
            'job',
            'applicant'
        ).get(id=application_id)

        data = {
            "id": application.id,
            "status": application.status,
            "applied_on": application.applied_on,

            "applicant": application.applicant.username,

            "job_title": application.job.title,
            "company": application.job.company,
            "location": application.job.location,
            "salary_range": application.job.salary_range,
            "description": application.job.description,
            "posted_on": application.job.posted_on,
        }

        return Response(data)

    except Application.DoesNotExist:
        return Response(
            {"message": "Application not found"},
            status=status.HTTP_404_NOT_FOUND
        )