export const makeEntitiesData = () => {
  return {
    "user": {
      "resources": {
        "u1": {
          "taskIds": [
            "t1"
          ],
          "username": "Lando",
          "avatarBg": "#b4e1e1"
        },
        "u2": {
          "taskIds": [
            "t2",
            "t9"
          ],
          "username": "Han",
          "avatarBg": "#222"
        },
        "u3": {
          "username": "Chewy",
          "avatarBg": "#a42231",
          "taskIds": [
            "t8"
          ]
        },
        "u4": {
          "username": "Luke",
          "avatarBg": "#D27A0B",
          "taskIds": [
            "t3",
            "t6"
          ]
        },
        "u5": {
          "username": "Leia",
          "avatarBg": "#44D20B",
          "taskIds": [
            "t10"
          ]
        },
        "u6": {
          "username": "C3PO",
          "avatarBg": "#FFD700",
          "taskIds": [
            "t4"
          ]
        },
        "u7": {
          "username": "R2D2",
          "avatarBg": "#2231a4",
          "taskIds": [
            "t5"
          ]
        }
      },
      "ids": [
        "u6",
        "u3",
        "u2",
        "u1",
        "u5",
        "u4",
        "u7"
      ]
    },
    "status": {
      "resources": {
        "s1": {
          "title": "Todo",
          "taskIds": [
            "t1",
            "t4",
            "t5",
            "t10"
          ],
          "isDefaultStatus": true
        },
        "s2": {
          "title": "In Progress",
          "taskIds": [
            "t2",
            "t6",
            "t8"
          ]
        },
        "s3": {
          "title": "Done",
          "taskIds": [
            "t3",
            "t9"
          ]
        }
      },
      "ids": [
        "s1",
        "s2",
        "s3"
      ]
    },
    "task": {
      "resources": {
        "t1": {
          "statusId": "s1",
          "assigneeId": "u1",
          "title": "Destroy the Death Star",
          "description": ""
        },
        "t2": {
          "statusId": "s2",
          "assigneeId": "u2",
          "title": "Milleium Falcon maintenance",
          "description": "Deflector shield needs some work done on it."
        },
        "t3": {
          "statusId": "s3",
          "title": "Build a new light saber",
          "assigneeId": "u4",
          "description": "Notes: blue crystal was out of stock. Went with green b/c it had 2-day shipping"
        },
        "t4": {
          "statusId": "s1",
          "title": "Download latest TranLang III patch",
          "assigneeId": "u6",
          "description": "There are some new languages available, need to pull latest version"
        },
        "t5": {
          "statusId": "s1",
          "title": "Process Death Star schematics",
          "assigneeId": "u7",
          "description": "Output to PDF's if possible"
        },
        "t6": {
          "statusId": "s2",
          "title": "Arm therapy",
          "assigneeId": "u4",
          "description": "Luke needs his therapy for his new robotic arm"
        },
        "t8": {
          "statusId": "s2",
          "title": "Buy shampoo and conditioner",
          "assigneeId": "u3",
          "description": "\"Glaghhl raulghhh mrghh aulrghh\" -Chewbacca"
        },
        "t9": {
          "statusId": "s3",
          "title": "Get unfrozen and escape Jabba's palace",
          "assigneeId": "u2"
        },
        "t10": {
          "statusId": "s1",
          "title": "Destroy the shield generator",
          "assigneeId": "u5"
        }
      },
      "ids": [
        "t1",
        "t10",
        "t5",
        "t2",
        "t9",
        "t3",
        "t4",
        "t6",
        "t8"
      ]
    },
    "tag": {
      "resources": {},
      "ids": []
    },
    "comment": {
      "resources": {},
      "ids": []
    }
  }
};
