import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
  where,
  documentId,
} from "firebase/firestore";
import { firebase } from "../config/firebaseConfig";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";

const db = getFirestore(firebase);

const getDBRef = async (userId: string) => {
  const databaseRef = await collection(db, "post");

  const finalData: DocumentData[] = [];
  const q = query(databaseRef, where("userId", "==", userId));

  const docSnap = await getDocs(q);

  docSnap.forEach((doc) => {
    const post = {
      id: doc.id,
      ...doc.data(),
    };
    finalData.push(post);
  });
  return finalData;
};

export class PostController {
  public fetchPost = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const collectionData = await getDBRef(userId);

    res.send({
      message: "Berhasil",
      data: collectionData,
    });
  };

  public createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        next(
          new HttpException(
            500,
            "Fail create Post Field Title or Description is Empty"
          )
        );
      } else {
        await addDoc(collection(db, "post"), req.body);
        res.status(200).send({
          message: "Success Create Data",
        });
      }
    } catch (error) {
      next(new HttpException(500, "Fail create Post"));
    }
  };

  public updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const post = doc(db, "post", id);
      await updateDoc(post, data);
      res.status(200).send({ message: "product updated successfully" });
    } catch (error) {
      next(new HttpException(500, "Fail Update Post"));
    }
  };

  public deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, "post", id));
      res.status(200).send({ message: "product deleted successfully" });
    } catch (error) {
      next(new HttpException(500, "Fail Delete Post"));
    }
  };
}
