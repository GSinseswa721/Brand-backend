import { Router } from "express";

import { createMessage, getMessages, getMessage, deleteMessage, updateMessage} from "../controllers/message";
//import { isAdmin } from "../utils/authentication";

const messageRouter = Router();

/**
 * @openapi
 * /
 *   post:
 *     summary: Create a new message
 *     tags: [Message]
 *     parameters:
 *       - in: formData
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the sender
 *       - in: formData
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email address of the sender
 *       - in: formData
 *         name: subject
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject of the message
 *     responses:
 *       200:
 *         description: Message created successfully
 *       500:
 *         description: Internal Server Error
 */
messageRouter.post("/", createMessage);

/**
 * @openapi
 * /:
 *   get:
 *     summary: Retrieve all messages
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: A list of messages
 *       500:
 *         description: Internal Server Error
 */
messageRouter.get("/", getMessages);

/**
 * @openapi
 * /{id}:
 *   get:
 *     summary: Retrieve a message by ID
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message ID
 *     responses:
 *       200:
 *         description: A single message object
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal Server Error
 */
messageRouter.get("/:id", getMessage);

/**
 * @openapi
 * /{id}:
 *   patch:
 *     summary: Update a message by ID
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message updated successfully
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal Server Error
 */
messageRouter.patch("/:id", updateMessage);

/**
 * @openapi
 * /{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal Server Error
 */
messageRouter.delete("/:id", deleteMessage);


export default messageRouter;