# Repository description
Current repository contains short videos that demonstrate how to deploy Yandex Alice Skill back-end to the AWS 
environment.
Here are considered two options:
<ol>
    <li>Lambda Function back-end</li>
    <li>Elastic Beanstalk</li>
</ol>
Other options can also be used for the purpose - EC2, EKS, ECS etc.

## Lambda Function back-end
Proceed with the following steps to create a back-end:
<ol>
    <li>
        Login to AWS Management Console and open AWS Lambda homepage.
    </li>
    <li>
        Create a new environment using Node.js runtime.<br/>
        Chose option 'Enable function URL' without authorization (NONE).
    </li>
    <li>
        Place the code from ./lambda/alice-cities-game-skill-handler.js to the code editor; deploy & build.
    </li>
</ol>

## Elastic Beanstalk back-end
This way is much longer at it requires configuring communication over HTTPS protocol. In its turn, it requires any valid
issued or self-signed certificate.
<ol>
    <li>
        Open Elastic Beanstalk page and create a new environment using Node.js. Upload application code from 
./beanstalk/cloud.zip.
    </li>
    <li>
        Open AWS Certificate Manager page and request a new certificate if needed. You are allowed to request
        certificates only for domains you own.<br/>
        <strong>You cannot request a certificate for *.elasticbeanstalk.com</strong>
    </li>
    <li>
        Create an alias resource record (A) for your domain on Route 53 page. This record links your domain name with 
        Elastic Beanstalk application.
    </li>
</ol>

## Video Manuals
Folder ./video/ contains provides video files containing detailed instructions.